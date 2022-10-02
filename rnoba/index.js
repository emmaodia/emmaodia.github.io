/** [WIP] Configure Dotenv 
import dotenv from "dotenv";
dotenv.config();

const AUTH_KEY = process.env.AUTH_KEY;
*/

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: AUTH_KEY,
  },
};

const $setData = document.getElementById("setData");
let $totalNFTs = document.getElementById("totalNFTs");
let $data = document.getElementById("data");

let tableRef = document.getElementById("tokenTable");
tableRef.innerHTML = `<thead class="thead-dark">
              <tr>
                  <th>Contract Address</th>
                  <th>Token Name</th>
                  <th>Token ID</th>
                   <th>Image URL</th>
                  <th>Creator Address</th>
              </tr>
          </thead>
          <tbody>
          </tbody>`;

$setData.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = e.target.elements[0].value;
  console.log(data);

  const url = new URL(
    `https://api.nftport.xyz/v0/accounts/${data}?chain=ethereum&include=metadata`
  );

  try {
    const response = await fetch(url, options);
    const results = await response.json();
    const nfts = results.nfts;
    $totalNFTs.innerHTML = results.total;
    console.log(results);

    nfts.map((result) => {
      tableRef.insertRow().innerHTML =
        `<td> <a href="https://etherscan.io/address/${result.contract_address}" target="_blank">${result.contract_address}</a></td>` +
        `<td> ${result.name} </td>` +
        `<td> ${result.token_id} </td>` +
        `<td> <a href="${result.metadata.image}" target="_blank">image</a></td>` +
        `<td> <a href="https://etherscan.io/address/${result.creator_address}" target="_blank">${result.creator_address}</a></td>`;
    });
  } catch (error) {
    console.log(error);
  }
});
