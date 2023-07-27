import { makeStyles } from "@mui/styles";

const styles = () => {
  return {
    heroBox: {
      width: "100%",
      display: "flex",
      minHeight: "600px",
      alignItems: "center",
      justifyContent: "center",
    },
    gridContainer: {
      display: "flex",
      alignItems: "center",
      maxWidth: "1300px",
      padding: "50px",
    },
    aboutUsContainer: {
      width: "100%",
      display: "flex",
      minHeight: "400px",
      alignItems: "center",
      justifyContent: "center",
      margin: "30px 0px 50px 0px",
    },
    aboutUsSubtitle: {
      opacity: "0.7",
      paddingBottom: "30px",
      fontSize: "18px",
    },
    title: {
      paddingBottom: "15px",
    },
    subtitle: {
      opacity: "0.4",
      paddingBottom: "30px",
    },
    largeImage: {
      width: "100%",
    },
  };
};

const useStyles = makeStyles(styles as any);
export default useStyles;
