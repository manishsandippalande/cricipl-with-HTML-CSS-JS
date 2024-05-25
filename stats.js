async function mostruns() {
  const url =
    "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7607?statsType=mostRuns";
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
    let tablemostruns = document.getElementById("mostRuns");
    let mostrunsarray = result.t20StatsList.values;
	let counter = 0
    mostrunsarray.forEach((element) => {
		counter += 1
      tablemostruns.innerHTML += `<tr>
			<td class="pname">${element.values[1]}</td>
			<td class="col-ten">${element.values[2]}</td>
			<td class="col-ten">${element.values[3]}</td>
			<td class="col-ten">${element.values[4]}</td>
			<td class="col-ten">${element.values[5]}</td>
		</tr>`;
    });
  } catch (error) {
    console.error(error);
  }
}

mostruns()