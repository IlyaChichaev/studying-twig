<?php

declare( strict_types=1 );

namespace MyDatabase;

use Exception;
use mysqli;

class Database {

    private const SERVER_NAME = 'localhost';

    private const USER_NAME = 'currencies_root';

    private const PASSWORD = 'password';

    private const DB_NAME = 'currencies_DB';

    /**
     * @var string
     */
    private string $db_table = 'Currencies';

    /**
     * @var \mysqli
     */
    public readonly mysqli $connectionDataBase;

    public function __construct() {
        $this->connect_db();
    }

    public function __destruct() {
        $this->close_db();
    }


    /**
     * The function connects to the db and sets the variable
     * $connectionDataBase to the value of the established connection with the
     * db server. An error will be displayed if the connections failed.
     */
    private function connect_db(): void {
        $this->connectionDataBase = new mysqli( self::SERVER_NAME,
                                                self::USER_NAME,
                                                self::PASSWORD,
                                                self::DB_NAME );
//        echo 'The connection was successful' . "\n";

        if ( $this->connectionDataBase->connect_error ) {
            die( 'The connection failed: '
                 . $this->connectionDataBase->connect_error . "\n" );
        }
    }


    /**
     * The function closes a previously opened database connection and sets the
     * variable $connectionDataBase to NULL
     */
    public function close_db(): void {
        $this->connectionDataBase->close();
//        echo 'DB connection closed.' . "\n";
    }


    /**
     * The function sends query to db server and return array
     *
     * @param  string  $query  Query to MySQL server
     *
     * @return string[] returns a mysqli_result::fetch_all( MYSQLI_ASSOC )
     *     array or an empty array if the mysqli_query returns TRUE or FALSE.
     */
    private function send_query_db(
        string $query
    ): array {
        try {
            $result = $this->connectionDataBase->query( $query );
        } catch ( Exception ) {
            echo "Warning: " . $this->connectionDataBase->error . ".\n";
        }

        if ( is_bool( $result ) ) {
            return [];
        }

        return $result->fetch_all( MYSQLI_ASSOC );
    }

    /**
     * The function displays a list of all currencies from the database
     * Format: "Code Currency"
     */
    public
    function get_currencies_list(): array {
        $query = "SELECT * FROM `$this->db_table`";

        return $this->send_query_db( $query );
    }

}