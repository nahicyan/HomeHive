import { Card, CardContent, Typography } from "@mui/material";

const FactCard = ({ title, value }) => {
  return (
    <Card
      elevation={3}
      sx={{
        flex: 1,
        textAlign: "center",
        borderRadius: "14px",
        padding: "20px",
        background: "linear-gradient(135deg, #f9f9fb, #f4f4f5)",
        boxShadow: "5px 10px 15px rgba(0, 0, 0, 0.1)", // Shadow bottom-left
        transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: "10px 15px 25px rgba(0, 0, 0, 0.15)", // Stronger shadow on hover
          background: "linear-gradient(135deg, #e0e0e3, #ffffff)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "5px",
          background: "linear-gradient(90deg, #ff8c42, #ff6f00)",
          top: 0,
          left: 0,
          transition: "transform 0.3s ease",
          transform: "scaleX(0)",
          transformOrigin: "left",
        },
        "&:hover::before": {
          transform: "scaleX(1)",
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={500}
          color="#1d1d1f"
          sx={{
            transition: "color 0.3s ease",
            "&:hover": { color: "#ff6f00" },
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
            color: "#7a7a7a",
            fontWeight: 300,
            letterSpacing: "0.5px",
            transition: "color 0.3s ease",
            "&:hover": { color: "#ff8c42" },
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FactCard;
