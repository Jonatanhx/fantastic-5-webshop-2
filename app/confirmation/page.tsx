"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useCart } from "../context/CartContext";
import { useCustomer } from "../context/PaymentContext";
import QuantityButton from "../ui/quantityButton";

function Confirmation() {
  const { cart } = useCart();

  const { customer } = useCustomer();

  // Beräkna det totala priset för alla varor i kundvagnen
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <Container>
      {/* Box för orderbekräftelse */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          marginTop: "20px",
          padding: "20px",
          minHeight: "300px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Orderbekräftelse</h1>
        {/* Hejdå och tack meddelande till kund */}
        <Typography>
          Tack för ditt köp! Hoppas du blir riktigt nöjd över dina nya tavlor.
        </Typography>
        <Typography>
          Här kommer ditt digitala kvitto från Wall of Art. Mer inspiration
          finns på vår hemsida Wall of Art.se där du kan se olika tavlor för
          olika stylingar.
        </Typography>
        <Typography>
          Hoppas vi hörs snart igen! Hälsningar från oss på Wall of Art
        </Typography>

        {/* Spaceing mellan boxarna och css styleing */}
        {/* Mappar ut från paymentSection ut till bekräftelse sidan */}
        <Grid container spacing={1}>
          {cart.map((item) => (
            <Grid
              item
              xs={12}
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "column", // Gör så att innehållet staplas vertikalt
                marginTop: "30px",
              }}
            >
              {/* Titel */}
              <Typography
                sx={{
                  fontSize: "16px",
                  textAlign: "left",
                  marginBottom: "8px", // Lägger till lite marginal mellan titel och pris
                }}
                variant="h6"
              >
                {item.title}
              </Typography>

              {/* QuantityButton, med visningskontroller beroende på sidan */}
              <Box sx={{ alignSelf: "flex-start" }}>
                {/* <QuantityButton showControls={false}  /> */}
                <QuantityButton
                  productId={item.id}
                  initialQuantity={item.quantity}
                  showTotalPrice
                  showControls={false}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Totalpris för hela beställningen */}
        <Typography variant="h6" sx={{ marginTop: "20px" }}>
          Totalt: {totalPrice} kr
        </Typography>
      </Box>

      {/* Box för adressinformation */}
      <Box
        sx={{
          marginTop: "20px",
          padding: "20px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography
          sx={{
            whiteSpace: "pre-line",
          }}
        >
          {/* Render form data */}
          <Typography>Name: {customer.name}</Typography>
          <Typography>Address: {customer.address}</Typography>
          <Typography>Zip: {customer.zip}</Typography>
          <Typography>City: {customer.city}</Typography>
          <Typography>Email: {customer.email}</Typography>
          <Typography>Phone: {customer.phone}</Typography>
        </Typography>
      </Box>
    </Container>
  );
}

export default Confirmation;
