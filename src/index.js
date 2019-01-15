document.addEventListener('DOMContentLoaded', () => {

	const tableBody = document.getElementById('table-body')
	const dogForm = document.getElementById('dog-form')
	const dogNameInput = document.getElementById('name')
	const dogBreedInput = document.getElementById('breed')
	const dogSexInput = document.getElementById('sex')

	const dogsURL = 'http://localhost:3000/dogs'
	/*****************************************************
	On page load, render a list of already registered dogs in the table.
	You can fetch these dogs from http://localhost:3000/dogs.
	*****************************************************/

	function getDogs() {
		return fetch(dogsURL)
			.then(res => res.json())
	}

	getDogs()
		.then(dogData => dogData.forEach((dog) => {
			return tableBody.innerHTML += `
						<tr>
    					<td class="dog-name">${dog.name}</td>
    					<td class="dog-breed">${dog.breed}</td>
    					<td class="dog-sex">${dog.sex}</td>
    					<td>
								<button id=${dog.id}>Edit</button>
								</td>
						</tr>
					`
		}))

	/*****************************************************
	Make a dog editable. Clicking on the edit button next
	to a dog should populate the top form with that dog's
	current information.
	*****************************************************/
	// add event listener to the dog container for edit button
	let currentDogID;
	tableBody.addEventListener('click', function (e) {
		fetch(dogsURL + `/${e.target.id}`)
			.then(res => res.json())
			.then((dog) => {
				dogNameInput.value = dog.name
				dogBreedInput.value = dog.breed
				dogSexInput.value = dog.sex
				currentDogID = dog.id
				console.log(currentDogID)
			})
	});

	/*****************************************************
	On submit of the form, a PATCH request should be made to
	http://localhost:3000/dogs/:id to update the dog information
	(including name, breed and sex attributes).
	*****************************************************/
	dogForm.addEventListener('submit', function (e) {
		e.preventDefault()
		fetch(dogsURL + `/${currentDogID}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					name: dogNameInput.value,
					breed: dogBreedInput.value,
					sex: dogSexInput.value
				}),
			}).then(res => res.json())
			.then((dog) => {
				// dog.name = dogNameInput.value
				// dog.breed = dogBreedInput.value
				// dog.sex = dogSexInput.value
				// console.log(dog)
			})
			let currentTableRow = document.getElementById(`${currentDogID}`).parentElement.parentElement;
			let dogName = currentTableRow.querySelector('.dog-name')
			let	dogBreed =currentTableRow.querySelector('.dog-breed')
			let dogSex = currentTableRow.querySelector('.dog-sex')
			console.log(dogName,dogBreed,dogSex);
					dogName.innerText = dogNameInput.value
					dogBreed.innerText = dogBreedInput.value
					dogSex.innerText = dogSexInput.value
	});

})
