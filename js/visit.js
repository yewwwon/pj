const host = "http://127.0.0.1:5500";

const visitsContainer = document.querySelector(".container .visits-container");

function getVisits() {
  axios
    .get(`${host}/visit`)
    .then((response) => {
      console.log(response.data);
      renderVisits(response.data.visits);
    })
    .catch((error) => {
      console.error("Error fetching visits:", error);
    });
}

function renderVisits(visits) {
  visitsContainer.innerHTML = "";
  visits.forEach((visit) => {
    const visitDiv = document.createElement("div");
    visitDiv.classList.add("visit-item");

    // Format the timestamp
    const visitTime = new Date(visit.timestamp);
    const formattedTime = visitTime.toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    visitDiv.textContent = `${visit.item} (방문 시간: ${formattedTime})`;
    visitsContainer.appendChild(visitDiv);

    // 삭제 버튼 생성 및 이벤트 처리
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "x";

    deleteBtn.addEventListener("click", function () {
      deleteVisit(visit.id);
    });

    // visitDiv에 삭제 버튼 추가
    visitDiv.appendChild(deleteBtn);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  getVisits();
});

const visitInput = document.querySelector(".container .visit-input");

visitInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addVisit();
  }
});

function addVisit() {
  const title = visitInput.value.trim();
  let visitData = {
    id: 0,
    item: title,
    timestamp: new Date().toISOString(), // 현재 시간을 ISO 형식으로 저장
  };
  if (title === "") return;

  axios
    .post(`${host}/visit`, visitData)
    .then((response) => {
      visitInput.value = "";
      getVisits();
    })
    .catch((error) => {
      console.error("Error adding visit:", error);
    });
}

function deleteVisit(visitId) {
  axios
    .delete(`${host}/visit/${visitId}`)
    .then(function (response) {
      console.log("Visit deleted:", response.data);
      getVisits();
    })
    .catch(function (error) {
      console.error("Error deleting visit:", error);
    });
}
