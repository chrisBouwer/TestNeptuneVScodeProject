import React from 'react'
import * as api from 'planet9-internal/Swagger Petstore - OpenAPI 3.0';

interface State {
    pets: api.Pet[]
    selectedPet?: api.Pet;
}

class App extends React.Component<{}, State> {

    constructor(props) {
        super(props);
        this.state = {
            pets: []
        }
    }

    componentDidMount() {
        api.GET_pet_findByStatus('available')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    pets: data
                })
            });
    }

    select(pet: api.Pet) {
        this.setState({ selectedPet: pet });
    }

    render() {
        const { selectedPet, pets } = this.state;
        return <div className="App">
            <header className="App-header">
                <div className="Pet-list">

                    <p className="Title">
                        Pet list
                    </p>
                    {pets.map(pet =>
                        <div className="Item" key={pet.id} onClick={() => this.select(pet)}>
                            <p>
                                {pet.name}
                            </p>
                        </div>
                    )}
                </div>
                <div>
                    <div className="Pet-details">
                        <p className="Title">
                            Pet Details
                        </p>
                        {selectedPet &&
                            <div>
                                <div>ID: {selectedPet.id}</div>
                                <div>Name: {selectedPet.name}</div>
                                <div>Status: {selectedPet.status}</div>
                                <div>Tags:</div>
                                {selectedPet.tags.map(tag =>
                                    <div key={tag.id}>{tag.name}</div>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </header>
        </div>
    }
}

export default App;