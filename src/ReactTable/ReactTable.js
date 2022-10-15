import React from 'react'
import { Center, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr, Image, Button } from '@chakra-ui/react';
import { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { useTable } from 'react-table';

const url = "https://fakestoreapi.com/products";


const tableColumn = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ row }) => <Image src={row.values.image} h={50} />,
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ row }) => `$ ${row.values.price}`,
  },

  {
    Header: "Action",
    Cell: ({ row }) => (
      <Button size="sm" onClick={() => alert(`$ ${row.values.price}`)}>Show Price</Button>
    ),
  },
];

const ReactTable = () => {

    const [products, setProducts] = useState([]);

   const columns = useMemo(()=>tableColumn, [])
   const data = useMemo(()=>products, [products])
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
       columns,
       data
    })

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(url);
                setProducts(data);
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchProducts();
    },[])
    console.log(products);
    if (products.length === 0) {
        return (
            <Center>
                <Spinner/>
           </Center>
       )
   }
  return (
    <>
      <div>
        <Heading> Hello React Table </Heading>
        <Table variant="striped" colorScheme="orange" {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                    <Th {...column.getHeaderProps()}>
                        {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
                      {rows.map((row, i) => {
                          prepareRow(row)
               return (
                 <Tr {...row.getRowProps()}>
                   {row.cells.map((cell) => (
                     <Td {...cell.getCellProps()}>
                       {cell.render("Cell")}
                     </Td>
                   ))}
                 </Tr>
               );
           })}
          </Tbody>
        </Table>
      </div>
    </>
  );
}

export default ReactTable