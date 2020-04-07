import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cardlist from '../components/Cardlist';
import Search from '../components/Search';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { setSearchField, requestRobots } from '../actions';


const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {

    // asagida 2 state-miz var robots ve searchfields
    // state- ancaq class componentde yaratmaq olur
    // state props-dan ferqli olaraq deyisile bilir
    // redux istifade etdikden sonra construktora ehtiyac qalmadi stat-ler redux-da
    // constructor() {
    //     super()
    //     this.state = {
    //         robots: []
    //     }
        // redux istidade edenden sonra yuxarida field-den sildim searchField: ''
    

    // constructor-dan sonra asagidaki yuklenir linkden melumatlar goturur, robotsa verir
    componentDidMount(){
        // asagidakini yoxlamaq ucun qoydum, hazirki statusu gosterir
        //console.log(this.props.store.getState());
        // fetch('https://jsonplaceholder.typicode.com/users')
        // .then(response => response.json())
        // .then(users => this.setState({robots: users}));
        // yuxaridaki 3 serte redux gelenden sonra ehtiyac qalmadi
        this.props.onRequestRobots(); 
    }

    // search hissesine yazilanlari tutur, asagida search komponentinin icine bax
    // redux istifade edenden sonra asagidakina ehtiyac qalmadi
    // onSearchChange = (event) => {
    //     this.setState({ searchfields: event.target.value })
    // }

    render(){
        // destructisation etdim ve heryerde this.state.robots ve ya this.state.searchfields yazmaga ehtiyac qalmadi 
        const {searchField, onSearchChange, robots, isPending} = this.props;
        const filteredRobots = robots.filter( robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        // asagidaki if le deyrikki yuxaridaki linkden melumat gec gelse, ve ya linke problem olsa ekrana bu cixsin
        if (isPending) {
            return <h1 className="tc">Loading</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className="f2">Robo Friends</h1>
                    <Search className="bg-light-green" searchChange={onSearchChange}/>
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


export default connect(mapStateToProps, mapDispatchToProps) (App);

