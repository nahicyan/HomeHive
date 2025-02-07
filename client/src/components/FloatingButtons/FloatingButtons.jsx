import { Box } from "@mui/material";
import { Phone, Email, Handshake } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../FloatingButton/FloatingButton"; // Import reusable button component

const FloatingButtons = ({ propertyData }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        zIndex: 1000,
      }}
    >
      <FloatingButton
        icon={<Phone fontSize="large" />}
        label="Call"
        bgColor="#28a745"
        hoverColor="#1e7a34"
        onClick={() => console.log("Calling...")}
      />

      <FloatingButton
        icon={<Handshake fontSize="large" />}
        label="Make Offer"
        bgColor="#ff8c42"
        hoverColor="#e6761f"
        onClick={() =>
          navigate(`/properties/${propertyData?.id}/offer`, {
            state: { property: propertyData },
          })
        }
      />

      <FloatingButton
        icon={<Email fontSize="large" />}
        label="Message"
        bgColor="#007bff"
        hoverColor="#0056b3"
        onClick={() => console.log("Messaging...")}
      />
    </Box>
  );
};

export default FloatingButtons;
