async function getmatches() {
  const url = "https://cricbuzz-cricket.p.rapidapi.com/series/v1/7607";
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
    let cardscont = document.getElementById("cardscont");

    result.matchDetails.forEach((element) => {
      if (element.matchDetailsMap) {
        let matches = element.matchDetailsMap.match;
        console.log(matches);
        console.log(typeof matches);
        for (const indexnum in matches) {
          let cmatch = matches[indexnum].matchInfo;
          if (matches[indexnum].matchScore) {
            cardscont.innerHTML += `<div class="matchcard" onclick="matchdetails(${cmatch.matchId})">
                    <div class="insidecont">
                        <h6 class="text-center">${cmatch.matchDesc}</h6>
                        <h6 class="text-center">${element.matchDetailsMap.key}</h6>
                        <div class="flex-box">
                            <div class="team1 col-md-4">
                                <h4 class="teamname">${cmatch.team1.teamName}</h4>
                                <div class="score">${matches[indexnum].matchScore.team1Score.inngs1.runs}/${matches[indexnum].matchScore.team1Score.inngs1.wickets}  (${matches[indexnum].matchScore.team1Score.inngs1.overs}/20 overs)</div>
                            </div>
                            <div class="vs col-md-4">VS</div>
                            <div class="team2 col-md-4">
                                <h4 class="teamname">${cmatch.team2.teamName}</h4>
                                <div class="score">${matches[indexnum].matchScore.team1Score.inngs1.runs}/${matches[indexnum].matchScore.team1Score.inngs1.wickets}  (${matches[indexnum].matchScore.team1Score.inngs1.overs}/20 overs)</div>
                            </div>
                        </div>
                        <div class="result">
                            <h5>${cmatch.status}</h5>
                        </div>
                    </div>
                </div>`;
          }
          else{
            cardscont.innerHTML += `<div class="matchcard">
                    <div class="insidecont">
                        <h6 class="text-center">${cmatch.matchDesc}</h6>
                        <div class="flex-box">
                            <div class="team1 col-md-4">
                                <h4 class="teamname">${cmatch.team1.teamName}</h4>
                            </div>
                            <div class="vs col-md-4">VS</div>
                            <div class="team2 col-md-4">
                                <h4 class="teamname">${cmatch.team2.teamName}</h4>
                            </div>
                        </div>
                    </div>
                </div>`;
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

getmatches();


async function matchdetails(matchId) {
  window.location.href = `matchdetails.html?matchId=${matchId}`;
}


async function iplpointstable(){
    const url = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7607/points-table';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '92fb2b78edmsha77576005d49312p1e290bjsn6812465293f4',
            'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
}
}