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
