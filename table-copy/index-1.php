<?php

ini_set( 'display_errors', 1 );
ini_set( 'error_reporting', - 1 );
ini_set( 'display_startup_errors', 1 );

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

include '../vendor/autoload.php';

$loader = new FilesystemLoader( 'templates' );
$twig   = new Environment( $loader );

$database                    = new MyDatabase\Database();
$database_array              = $database->get_currencies_list();
$table_array['heading_rows'] = array_keys( (array) $database_array[0] );

foreach ( $database_array as $row_array ) {
    $table_array['data_rows'][] = array_values( (array) $row_array );
}

$result_array = [ 'table_rows' => $table_array ];

echo $twig->render( 'base-1.twig', $result_array );