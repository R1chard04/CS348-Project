import java.sql.*;
import java.util.Scanner;

public class MaintainDB {

    private Scanner input = new Scanner(System.in);
    private Connection connection = null;

    public MaintainDB(String[] args) {

        try {
            Class.forName("com.ibm.db2.jcc.DB2Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("Missing DBMS driver.");
            e.printStackTrace();
        }

        try {
            connection = DriverManager.getConnection("jdbc:db2:CS348");
            System.out.println("Database connection open.\n");
            connection.setAutoCommit(false);
        } catch (SQLException e) {
            System.out.println("DBMS connection failed.");
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        MaintainDB menu = new MaintainDB(args);
        menu.mainMenu(args);
        menu.exit();
    }

    public void exit() {
        try {
            connection.commit();
            connection.close();
            System.out.println("Database connection closed.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void mainMenu(String[] args) throws SQLException {
        mainMenu:
        while (true) {
            System.out.println("\n-- Actions --");
            System.out.println(
                    "Select an option: \n" +
                            " 1) Add a price entry \n" +
                            " 2) Delete entries by country \n" +
                            " 0) Exit\n "
            );
            int selection = input.nextInt();
            input.nextLine();

            switch (selection) {
                case 1:
                    System.out.println("Please provide price entry info (adm0_id, adm0_name, adm1_id, adm1_name, mkt_id, mkt_name, cm_id, cm_name, cur_id, cur_name, pt_id, pt_name, um_id, um_name, mp_month, mp_year, mp_price, mp_commoditysource) separated with comma: ");
                    String entryInfo = input.nextLine();
                    this.addPriceEntry(entryInfo);
                    break;
                case 2:
                    System.out.println("Please provide the country name (adm0_name) to delete entries for: ");
                    String countryName = input.nextLine();
                    this.deleteEntriesByCountry(countryName);
                    break;
                case 0:
                    System.out.println("Returning...\n");
                    break mainMenu;
                default:
                    System.out.println("Invalid action.");
                    break;
            }
        }
    }

    private void addPriceEntry(String entryInfo) throws SQLException {
        String[] parts = entryInfo.split(",");
        String sql = "INSERT INTO wfp_food_prices (adm0_id, adm0_name, adm1_id, adm1_name, mkt_id, mkt_name, cm_id, cm_name, cur_id, cur_name, pt_id, pt_name, um_id, um_name, mp_month, mp_year, mp_price, mp_commoditysource) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement stmt = connection.prepareStatement(sql);

        for (int i = 0; i < parts.length; i++) {
            stmt.setString(i + 1, parts[i].trim());
        }

        stmt.executeUpdate();
        stmt.close();

        System.out.println("**Start of Answer**");
        System.out.println("Price entry added.");
        System.out.println("**End of Answer**");

        connection.commit();
    }

    private void deleteEntriesByCountry(String countryName) throws SQLException {
        String sql = "DELETE FROM wfp_food_prices WHERE adm0_name = ?";
        PreparedStatement stmt = connection.prepareStatement(sql);
        stmt.setString(1, countryName);

        int affectedRows = stmt.executeUpdate();
        stmt.close();

        System.out.println("**Start of Answer**");
        System.out.println("Deleted " + affectedRows + " entries for country: " + countryName);
        System.out.println("**End of Answer**");

        connection.commit();
    }
}
