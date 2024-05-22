async function gettable(seriesid) {
  const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/${seriesid}/points-table`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "92fb2b78edmsha77576005d49312p1e290bjsn6812465293f4",
      "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let pointstbldata = result.pointsTable[0].pointsTableInfo;
    let tbl = document.getElementById("tblpoints");
    tbl.innerHTML = `<tr class="throw">
        <th class="tname">TEAM</th>
        <th class="col">MATCHES</th>
        <th class="col">WON</th>
        <th class="col">LOST</th>
        <th class="col">PTS</th>
        <th class="col">NRR</th>
    </tr>`
    for (const i in pointstbldata) {
      tbl.innerHTML += `<tr style="background-color: rgb(0, 255, 0);">
                <td class="tname">${pointstbldata[i].teamFullName}</td>
                <td>${pointstbldata[i].matchesPlayed}</td>
                <td>${pointstbldata[i].matchesWon}</td>
                <td>${pointstbldata[i].matchesLost}</td>
                <td>${pointstbldata[i].points}</td>
                <td>${pointstbldata[i].nrr}</td>
            </tr>`;
    }
  } catch (error) {
    console.error(error);
  }
}

function getseriesid() {
    
    let seriesid = document.getElementById("year").value;
    gettable(seriesid);
}

document.addEventListener("DOMContentLoaded", getseriesid)