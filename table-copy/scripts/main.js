"use strict";


/**
 * Sorts the table by the chosen column
 * @param {number} column_sort - the selected column to sort the table
 */
function sortTable ( column_sort ) {
    let table        = document.querySelector ( "tbody" ) ,
        rows         = table.rows ,
        table_array  = [] ,
        table_row = [];

    for ( let row of rows ) {
        table_row = [];
        for ( let item of row.children ) {
            table_row.push ( item.innerHTML );
        }
        table_array.push ( table_row );
    }

    let first_row      = table_array.shift () ,
        sort_direction = document.querySelectorAll ( "TH" )[ column_sort ].getAttribute ( "data-sort" );

    /**
     * Callback function for the sort() method
     * @param {array} row1 - the first line for comparison
     * @param {array} row2 - the second line for comparison
     * @returns {number} - returns 1 or -1 for sort() method
     */
    function compareRows ( row1 , row2 ) {
        let row1Element = row1[ column_sort ] ,
            row2Element = row2[ column_sort ];
        if ( !isNaN ( Number ( row1Element ) ) || !isNaN ( Number ( row2Element ) ) ) {
            return sort_direction * Number ( row1Element ) - sort_direction * Number ( row2Element );
        }
        else {
            return row1Element > row2Element ? 1 * sort_direction : -1 * sort_direction;
        }
    }

    table_array.sort ( compareRows );
    table_array.unshift ( first_row );

    let i = 0;
    for ( let row of rows ) {
        let j = 0;
        for ( let item of row.children ) {
            item.innerHTML = table_array[ i ][ j ];
            j++;
        }
        i++;
    }
    changeAttributeAndArrow ( column_sort );
}

/**
 * Changes the attribute 'data-sort' of <th> and all
 * @param {number}column_sort - the selected column to sort the table
 */
function changeAttributeAndArrow ( column_sort ) {

    let head_row  = document.querySelectorAll ( "th" ) ,
        cell_sort = head_row [ column_sort ];

    /**
     * Changes symbols of the sorting direction
     * @param {string}data_sort - the <th> attribute (takes the value '1' or '-1')
     */
    function changeArrow ( data_sort ) {

        /**
         * Sets the "without sorting" symbol in all heading cells of the table
         */
        function setArrowWithoutSoring () {
            for ( let i = 0; i < head_row.length; i++ ) {
                if ( i === column_sort ) {
                    continue;
                }
                head_row[ i ].innerHTML = head_row[ i ].innerHTML.replace ( "dn" , "no" );
                head_row[ i ].innerHTML = head_row[ i ].innerHTML.replace ( "up" , "no" );
                head_row[ i ].setAttribute ( "data-sort" , "1" );
            }
        }

        switch ( data_sort ) {
            case "-1":
                cell_sort.innerHTML = cell_sort.innerHTML.replace ( "dn" , "up" );
                cell_sort.innerHTML = cell_sort.innerHTML.replace ( "no" , "dn" );
                setArrowWithoutSoring ();
                break;
            case "1":
                cell_sort.innerHTML = cell_sort.innerHTML.replace ( "up" , "dn" );
                cell_sort.innerHTML = cell_sort.innerHTML.replace ( "no" , "dn" );
                setArrowWithoutSoring ();
                break;
            default:
                cell_sort.setAttribute ( "data-sort" , "1" );
                setArrowWithoutSoring ();
                break;
        }
    }

    if ( cell_sort.hasAttribute ( "data-sort" ) ) {
        let data_sort = cell_sort.getAttribute ( "data-sort" );
        if ( data_sort === "1" ) {
            cell_sort.setAttribute ( "data-sort" , "-1" );
        }
        else if ( data_sort === "-1" ) {
            cell_sort.setAttribute ( "data-sort" , "1" );
        }

        changeArrow ( data_sort );
    }
}