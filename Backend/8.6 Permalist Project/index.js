import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
];

async function getList(){
  const result = await db.query(
    "SELECT * FROM items"
  );
  items = result.rows;
  return items;
};
app.get("/", async (req, res) => {
  const items = await getList();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  const result = await db.query(
    "INSERT INTO items (title) VALUES ($1)",
    [item]
  );
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const itemId = req.body.updatedItemId;
  const itemTitle = req.body.updatedItemTitle;

  try {
    // Retrieve the current item
    const currentItem = await db.query(
      "SELECT * FROM items WHERE id=$1",
      [itemId]
    );

    if (currentItem.rows.length === 0) {
      console.log("Item not found");
      res.redirect("/?error=Item%20not%20found");
      return;
    }

    console.log("Current item:", currentItem.rows[0]);

    // Update the item with new title
    await db.query(
      "UPDATE items SET title=$1 WHERE id=$2",
      [itemTitle, itemId]
    );

    // Redirect to the home page or another page after successful update
    res.redirect("/");
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).send("Server error");
  }
});


app.post("/delete", async (req, res) => {
  const deleteItemId = req.body.deleteItemId;
  const result = await db.query(
    "DELETE FROM items WHERE id=$1;",
    [deleteItemId]
  );
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
