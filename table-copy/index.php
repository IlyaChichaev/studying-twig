<?php

$start_timer = microtime( TRUE );

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

include '../vendor/autoload.php';
include "../database.php";

$loader = new FilesystemLoader( 'templates' );
$twig   = new Environment( $loader );

$database       = new Database();
$database_array = $database->get_currencies_list();

$table_array['table_heading'] = array_keys( (array) $database_array[0] );
//$table_array['heading_rows'] = array_keys( (array) $database_array[0] );

$result_array                 = [];
$result_array['heading_rows'] = $twig->render( 'table-heading.twig',
                                               $table_array );

foreach ( $database_array as $row_array ) {
    $rows['table_row']           = array_values( (array) $row_array );
    $result_array['table_row'][] = $twig->render( 'table-rows.twig',
                                                   $rows );
}

echo $twig->render( 'base.twig', $result_array );

//var_dump( $result_array );
//var_dump($table_array);

$end_timer = microtime( TRUE );
echo "<div class='text'>End time: " . $end_timer . "</div>";
echo "<div class='text'>Start time: " . $start_timer . "</div>";
echo "<div class='text'>" . (float) $end_timer - (float) $start_timer
     . "</div>";