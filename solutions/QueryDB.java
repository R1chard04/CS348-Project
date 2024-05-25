import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;

public class QueryDB {

    private Scanner input = new Scanner(System.in);
    private Connection connection = null;

    public QueryDB(String[] args) {

        try {
            Class.forName("com.ibm.db2.jcc.DB2Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("Missing DBMS driver.");
            e.printStackTrace();
        }

        try {
            connection = DriverManager.getConnection("jdbc:db2:CS348");
            System.out.println("Database connection open.\n");
            connection.setAutoCommit(false);  // Explicitly manage transactions
        } catch (SQLException e) {
            System.out.println("DBMS connection failed.");
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        QueryDB menu = new QueryDB(args);
        menu.mainMenu();
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

    public void mainMenu() throws SQLException {
        mainMenu:
        while (true) {
            System.out.println("\n-- Actions --");
            System.out.println(
                    "Select an option: \n" +
                            "  1) Get price entries by country\n" +
                            "  2) Get average price for a commodity\n" +
                            "  0) Exit\n "
            );
            int selection = input.nextInt();
            input.nextLine();

            switch (selection) {
                case 1:
                    System.out.println("Please provide the country name (adm0_name): ");
                    String countryName = input.nextLine().trim();
                    this.getPriceEntriesByCountry(countryName);
                    break;
                case 2:
                    System.out.println("Please provide the commodity name (cm_name): ");
                    String commodityName = input.nextLine().trim();
                    this.getAveragePriceForCommodity(commodityName);
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

    private void getPriceEntriesByCountry(String countryName) throws SQLException {
        String sql = "SELECT * FROM wfp_food_prices WHERE adm0_name = ?";
        PreparedStatement stmt = connection.prepareStatement(sql);
        stmt.setString(1, countryName);

        ResultSet rs = stmt.executeQuery();

        System.out.println("**Start of Answer**");
        while (rs.next()) {
            System.out.println(rs.getString("adm0_id") + ", " +
                               rs.getString("adm0_name") + ", " +
                               rs.getString("adm1_id") + ", " +
                               rs.getString("adm1_name") + ", " +
                               rs.getString("mkt_id") + ", " +
                               rs.getString("mkt_name") + ", " +
                               rs.getString("cm_id") + ", " +
                               rs.getString("cm_name") + ", " +
                               rs.getString("cur_id") + ", " +
                               rs.getString("cur_name") + ", " +
                               rs.getString("pt_id") + ", " +
                               rs.getString("pt_name") + ", " +
                               rs.getString("um_id") + ", " +
                               rs.getString("um_name") + ", " +
                               rs.getInt("mp_month") + ", " +
                               rs.getInt("mp_year") + ", " +
                               rs.getBigDecimal("mp_price") + ", " +
                               rs.getString("mp_commoditysource"));
        }
        System.out.println("**End of Answer**");

        rs.close();
        stmt.close();
        connection.commit(); 
    }

    private void getAveragePriceForCommodity(String commodityName) throws SQLException {
        String sql = "SELECT AVG(mp_price) AS avg_price FROM wfp_food_prices WHERE cm_name = ?";
        PreparedStatement stmt = connection.prepareStatement(sql);
        stmt.setString(1, commodityName);

        ResultSet rs = stmt.executeQuery();

        System.out.println("**Start of Answer**");
        if (rs.next()) {
            System.out.println("Average price for " + commodityName + ": " + rs.getBigDecimal("avg_price"));
        } else {
            System.out.println("No data found for commodity: " + commodityName);
        }
        System.out.println("**End of Answer**");

        rs.close();
        stmt.close();
        connection.commit(); 
    }
}
