import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

const DetailCard = ({ title, items }) => {
  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor: "#f9f9fb",
        borderRadius: "10px",
        padding: "18px 22px",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
        border: "0.5px solid #e6e6ea",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="400"
          color="#1d1d1f"
          sx={{
            marginBottom: "12px",
            paddingBottom: "6px",
            borderBottom: "0.5px solid #dcdce0",
          }}
        >
          {title}
        </Typography>

        <List sx={{ paddingLeft: 0 }}>
          {items.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                fontSize: "14px",
                color: "#4a4a4a",
                marginBottom: "5px",
                lineHeight: 1.7,
                fontWeight: 300,
                display: "list-item", // Ensures proper list styling
                listStyleType: "none",
              }}
            >
              {item}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
