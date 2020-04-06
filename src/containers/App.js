import React, { Component } from 'react';
import Cardlist from '../components/Cardlist';
import Search from '../components/Search';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';



class App extends Component {

    // asagida 2 state-miz var robots ve searchfields
    // state- ancaq class componentde yaratmaq olur
    // state props-dan ferqli olaraq deyisile bilir
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfields: ''
        }
    }

    // constructor-dan sonra asagidaki yuklenir linkden melumatlar goturur , robotsa verir
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }

    // search hissesine yazilanlari tutur, asagida search komponentinin icine bax
    onSearchChange = (event) => {
        this.setState({ searchfields: event.target.value })
    }

    render(){
        // destructisation etdim ve heryerde this.state.robots ve ya this.state.searchfields yazmaga ehtiyac qalmadi 
        const {robots, searchfields} = this.state;

        
        const filteredRobots = robots.filter( robot => {
            return robot.name.toLocaleLowerCase().includes(searchfields.toLocaleLowerCase());
        })
        // asagidaki if le deyrikki yuxaridaki linkden melumat gec gelse, ve ya linke problem olsa ekrana bu cixsin
        if (!robots.length) {
            return <h1 className="tc">Loading</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className="f2">Robo Friends</h1>
                    <Search className="bg-light-green" searchChange={this.onSearchChange}/>
                    {/* scroll elave etdim */}
                    
                    <ErrorBoundry>
                        <Scroll>
                            <Cardlist robots = { filteredRobots }/>
                        </Scroll>
                    </ErrorBoundry>
                    
                </div>
                );
        }
    }
}

export default App;

