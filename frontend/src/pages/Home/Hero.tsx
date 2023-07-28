import { Grid, Typography, Button, Box } from "@mui/material";

import useStyles from "./style";
import food from "../../assets/images/hero-image.png";

const Hero = () => {
  const classes = useStyles();

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={12} md={6}>
          <Typography variant='h3' fontWeight={700} className={classes.title}>
            Huge selection of delicios recipe ideas
          </Typography>
          <Typography variant='h6' className={classes.subtitle}>
            Explore our huge selection of delicious recipe ideas including; easy
            desserts, delicious vegan and vegetarian dinner ideas, gorgeous
            pasta recipes, quick bakes, family-friendly meals and gluten-free
            recipes.
          </Typography>
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              style={{
                marginRight: "20px",
                marginBottom: "10px",
                width: "200px",
                fontSize: "16px",
              }}
            >
              Explore Latest
            </Button>
            <Button
              variant='contained'
              color='secondary'
              sx={{ width: "200px", fontSize: "16px", marginBottom: "10px" }}
            >
              Show Random
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={food} alt='My Team' className={classes.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
