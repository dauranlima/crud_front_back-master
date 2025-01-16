import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
export default function PrintCart(cartItems) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
	const reportTitle = {
		text: "Pedido de Produtos",
	};
  const details = [];

  const footer = [];

  const docDefinition = {
		pageSize: "A4",
		pageMargins: [20, 50, 15, 30],
		header: [reportTitle],
    content:[details],
		footer: [footer]
  }
	pdfMake.createPdf(docDefinition).download("Impressão do Pedido de Produtos.pdf");


  // const docDefinition = {
	// 	pageSize: "A4",
	// 	pageMargins: [20, 50, 15, 30],
  //   header: [reportTitle],
  //   content: [
  //     {
  //       text: "Relatório de Produtos",
  //       style: "header",
  //     },
  //     {
  //       text: "Lista de Produtos",
  //       style: "subheader",
  //     },
  //     {
  //       table: {
  //         headerRows: 1,
  //         widths: ["*", "*", "*", "*", "*"],
  //         body: [
  //           [
  //             { text: "Produto", style: "tableHeader" },
  //             { text: "Quantidade", style: "tableHeader" },
  //             { text: "Preço", style: "tableHeader" },
  //             { text: "Total", style: "tableHeader" },
  //             { text: "Vendedora", style: "tableHeader" },
  //           ],
  //           ...cartItems.map((item) => [
  //             item.nome,
  //             item.quantity,
  //             item.preco,
  //             item.preco * item.quantity,
  //             item.vend,
  //           ]),
  //         ],
  //       },
  //       layout: "lightHorizontalLines",
  //     },
  //     {
  //       text: "Total Geral",
  //       style: "total",
  //     }
  //   ],
  //   footer:[],

  //   };
    

}