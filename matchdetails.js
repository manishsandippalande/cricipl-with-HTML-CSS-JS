async function matchdetails(matchId) {
    const url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/scard`;
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

    let scoreCard = result.scoreCard;

    let miniscorecard = document.getElementById("scoremini")
    miniscorecard.innerHTML = `<div class="team1">
            <div class="score">${scoreCard[0].scoreDetails.runs}/${scoreCard[0].scoreDetails.wickets} (${scoreCard[0].scoreDetails.overs}/20)</div>
            <div class="teamname text-center">${scoreCard[0].batTeamDetails.batTeamShortName}</div>
        </div>
        <div class="team2">
            <div class="score">${scoreCard[1].scoreDetails.runs}/${scoreCard[1].scoreDetails.wickets} (${scoreCard[1].scoreDetails.overs}/20)</div>
            <div class="teamname text-center">${scoreCard[1].batTeamDetails.batTeamShortName}</div>
        </div>`
    

    document.getElementById("team1name").textContent =
      scoreCard[0].batTeamDetails.batTeamName;
    document.getElementById("team2name").textContent =
      scoreCard[1].batTeamDetails.batTeamName;
    
    document.getElementById("result").textContent = result.matchHeader.status

    let inn1 = scoreCard[0].batTeamDetails.batsmenData;
    

    let inn1tbl = document.getElementById("inn1tbl");
    let notbatted1 = document.getElementById("notbatted1")
    for (i=1; i<=11; i++) {
        let isbatted1 = `${inn1[`bat_${i}`].outDesc}`
        if(isbatted1 == ""){
            notbatted1.innerHTML += `${inn1[`bat_${i}`].batName}`+", "
        }
        else{
            inn1tbl.innerHTML += `
            <tr class="trdata">
                <td class="playernameval">
                    <div class="minidata">
                        <div class="pname">${inn1[`bat_${i}`].batName}</div>
                        <div class="outdesc">${inn1[`bat_${i}`].outDesc}</div>
                    </div>
                </td>
                <td>${inn1[`bat_${i}`].runs}</td>
                <td>${inn1[`bat_${i}`].balls}</td>
                <td>${inn1[`bat_${i}`].fours}</td>
                <td>${inn1[`bat_${i}`].sixes}</td>
                <td>${inn1[`bat_${i}`].strikeRate}</td>
            </tr>`;
        }
        
    }

    let tabl1bowl = document.getElementById("inn1bowl")
    let inn1bowl = scoreCard[0].bowlTeamDetails.bowlersData
    for (let i in inn1bowl) {
      console.log(inn1bowl[i])
      tabl1bowl.innerHTML += `<tr>
            <td>${inn1bowl[i].bowlName}</td>
            <td>${inn1bowl[i].overs}</td>
            <td>${inn1bowl[i].maidens}</td>
            <td>${inn1bowl[i].runs}</td>
            <td>${inn1bowl[i].wickets}</td>
            <td>${inn1bowl[i].economy}</td>
        </tr>`
    }
    


    inn1tbl.innerHTML += `<tr class="trdata tscore">
        <td colspan="4">${scoreCard[0].scoreDetails.runs}/${scoreCard[0].scoreDetails.wickets} (${scoreCard[0].scoreDetails.overs}/20 overs)</td>
        <td colspan="2">RR : ${scoreCard[0].scoreDetails.runRate}</td>
    </tr>`


    // inning 2nd
    let inn2 = scoreCard[1].batTeamDetails.batsmenData;
    let inn2bowl = scoreCard[1].bowlTeamDetails.bowlersData

    let inn2tbl = document.getElementById("inn2tbl");
    let notbatted2 = document.getElementById("notbatted2")
    for (i=1; i<=11; i++) {
        let iscaptain = `${inn2[`bat_${i}`].isCaptain}`
        if(iscaptain = true){
            iscaptain = "(C)"
        }
        else{
            iscaptain = ""
        }
        let isbatted2 = `${inn2[`bat_${i}`].outDesc}`
        if(isbatted2 == ""){
            notbatted2.innerHTML += `${inn2[`bat_${i}`].batName}`+", "
        }
        else{
        inn2tbl.innerHTML += `
            <tr class="trdata">
                <td class="playernameval">
                    <div class="minidata">
                        <div class="pname">${inn2[`bat_${i}`].batName} ${iscaptain}</div>
                        <div class="outdesc">${inn2[`bat_${i}`].outDesc}</div>
                    </div>
                </td>
                <td>${inn2[`bat_${i}`].runs}</td>
                <td>${inn2[`bat_${i}`].balls}</td>
                <td>${inn2[`bat_${i}`].fours}</td>
                <td>${inn2[`bat_${i}`].sixes}</td>
                <td>${inn2[`bat_${i}`].strikeRate}</td>
            </tr>`;}
        
    }


    inn2tbl.innerHTML += `<tr class="trdata tscore">
        <td colspan="4">${scoreCard[1].scoreDetails.runs}/${scoreCard[1].scoreDetails.wickets} (${scoreCard[1].scoreDetails.overs}/20 overs)</td>
        <td colspan="2">RR : ${scoreCard[1].scoreDetails.runRate}</td>
    </tr>`


    let tabl2bowl = document.getElementById("inn2bowl")
    for (let i in inn2bowl) {
      tabl2bowl.innerHTML += `<tr>
            <td>${inn2bowl[i].bowlName}</td>
            <td>${inn2bowl[i].overs}</td>
            <td>${inn2bowl[i].maidens}</td>
            <td>${inn2bowl[i].runs}</td>
            <td>${inn2bowl[i].wickets}</td>
            <td>${inn2bowl[i].economy}</td>
        </tr>`
    }



  } catch (error) {
    console.error("Error fetching match details:", error);
  }
}

function getMatchIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("matchId");
}

document.addEventListener("DOMContentLoaded", () => {
  const matchId = getMatchIdFromUrl();
  if (matchId) {
    matchdetails(matchId);
  } else {
    console.error("No match ID found in URL");
  }
});
