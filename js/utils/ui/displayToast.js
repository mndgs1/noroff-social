export function displayToast(message, error = false) {
	const toastContainer = document.querySelector(".toast-container");

	if (!toastContainer) {
		document.body.innerHTML += `<div class="toast-container position-fixed bottom-0 end-0 p-3">
	    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
	      <div class="toast-body">
	      </div>
	    </div>
	  </div>`;
	}

	const toastBody = document.querySelector(".toast-body");

	toastBody.innerText = message;

	if (error) {
		toastBody.style.color = "red";
	}

	const toastLiveExample = document.getElementById("liveToast");
	const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
	toastBootstrap.show();
}
