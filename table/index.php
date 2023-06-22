<?php

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

include '../vendor/autoload.php';
include "../database.php";

$loader = new FilesystemLoader( 'templates' );
$twig   = new Environment( $loader );

$database       = new Database();
$database_array = $database->get_currencies_list();

$table_array['table_heading'] = array_keys( (array) $database_array[0] );

$result_array                = [];
$result_array['heading_row'] = $twig->render( 'table-heading.twig',
                                              $table_array );

foreach ( $database_array as $row_array ) {
    $rows['table_row']           = array_values( (array) $row_array );
    $result_array['table_row'][] = $twig->render( 'table-rows.twig',
                                                   $rows );
}

echo $twig->render( 'base.twig', $result_array );




