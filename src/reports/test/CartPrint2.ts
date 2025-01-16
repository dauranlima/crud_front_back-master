import { StyleSheet } from "@react-pdf/renderer"
export const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
		backgroundColor: "#fff",
		color: "#262626",
		fontFamily: "Helvetica",
		fontSize: "12px",
		padding: "30px 50px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});