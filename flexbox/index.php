<?php

error_reporting( - 1 );

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

include '../vendor/autoload.php';

$loader = new FilesystemLoader( 'templates' );
$twig   = new Environment( $loader );

$database    = new MyDatabase\Database();
$table_array = $database->get_currencies_list();

$array = [];
foreach ( $table_array as $index => $row_array ) {
    $array['table_rows'][] = $twig->render( 'table-row.twig',
                                            (array) $row_array );

}

echo $twig->render( 'base.twig', $array );

//$array = [];
//$arr   = [
//    'image' => [
//        'src'   => 'https://dummyimage.com/300x200/4a5166/ffffff',
//        'alt'   => 'Image with size',
//        'title' => 'Image with size',
//    ],
//    'title' => 'Card tittle',
//    'text'  => "Some quick example text to build on the card title and make up the bulk of the card's content.",
//];
//for ( $i = 0; $i < 3; $i ++ ) {
//    $array['block'][] = $twig->render( 'table-row.twig', $arr );
//}
////var_dump( $array );
//echo $twig->render( 'base.twig', $array );

