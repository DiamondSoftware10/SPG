import React, { Component } from 'react';
import InfoCard from "./Infocards";
import fire from '../Firebase/Fire';
//import Searchbar from './Searchbar';
import magnifier from '../Icons/magnifier2.svg';
import { Link } from 'react-router-dom';
import { Slider, Switch } from 'antd';
import { Input } from 'antd';
import { Checkbox } from 'antd';



import './Search.css'

import * as routes from '../Constants/Routes';

const db = fire.firestore();

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const CheckboxGroup = Checkbox.Group;

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            center: { lat: 0, lng: 0 },
            option: "title",
            searchTerm: "",
            foto: "",
            nextSearch: "",
            placeholder: "Buscar proyectos",
            title: "",
            location: "",
            min: "",
            max: "",
            filterCrops: [],


            titleOption: false,
            locateOption: false,
            invOption: false,
            cropOption: false,
            areaOption: false,
            available: false,
        }

        this.search = this.search.bind(this);
        this.searchDB = this.searchDB.bind(this);
        this.titleCase = this.titleCase.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.checkedVal = this.checkedVal.bind(this);
        this.minMaxValues = this.minMaxValues.bind(this);
        this.complexSearch = this.complexSearch.bind(this);
        this.getSliderValues = this.getSliderValues.bind(this);
    }

    /* async componentWillMount(){
        await fire.storage().ref().child(this.props.pic).getDownloadURL().then(url =>{
            this.setState({
                foto:url
            })
        })
     }*/


    /*componentWillReceiveProps(nextProps) {
        if (nextProps.id === this.props.id) {
            this.search();
        }
    }*/

    componentDidMount() {
        const type = this.props.match.params.type;
        const searchTerm = this.props.match.params.searchTerm;
        console.log("option: " + this.props.match.params.type)
        console.log("searchTerm:" + searchTerm)
        /* this.setState({
            //option: this.props .option,
            option: type
         })*/
        this.setState({
            option: type,
            searchTerm: searchTerm
        }, () => {
            this.search();
        });
        // this.search();
        //console.log(this.props.params.name);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.type !== this.props.match.params.type || prevProps.match.params.searchTerm !== this.props.match.params.searchTerm) {
            this.setState({
                option: this.props.match.params.type,
                searchTerm: this.props.match.params.searchTerm
            }, () => {
                this.search();
            });

        }

    }


    titleCase(str) {
        var splitStr = String(str).toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    getSliderValues(evt) {
        var arr = String(evt).split(",");
        console.log("min: " + arr[0]);
        console.log("max: " + arr[1]);

        this.setState({
            min: arr[0],
            max: arr[1]

        })
    }

    searchDB(query) {
        if (query != null) {
            console.log("valid query")
            query.get().then((snap) => {
                let data = [];
                if (snap.empty) {
                    console.log('No documents found');
                } else {

                    snap.forEach(function (doc) {
                        console.log("Doc ID: " + doc.id + " Data: " + doc.data().title);
                        data.push(doc.data())
                    })

                }

                this.setState({ searchResults: data })

            })
        } else {
            console.log("error");
        }
    }

    search() {

        console.log("option: " + this.state.option);
        console.log("searchTerm state: " + this.state.searchTerm);

        const searchTerm = this.props.match.params.searchTerm;
        const type = this.props.match.params.type;

        console.log("opcion: " + type)
        console.log("search term: " + searchTerm)
        console.log("Search term: " + this.titleCase(searchTerm));


        var projects = db.collection("projects");
        var query
        if (this.state.option === "investment") {
            if (this.state.searchTerm.match(/[a-z]/i)) {
                alert("La busqueda por inversión no debe de contener letras");
                query = null;
            } else {
                query = projects.where("investInitxBlock", ">=", this.titleCase(parseInt(searchTerm)));
            }
        } else if (this.state.option === "locate" || this.state.option === "title") {
            query = projects.where(this.state.option, "==", this.titleCase(searchTerm));

        } else if (this.state.option === "cultures") {
            query = projects.where(this.state.option, "array-contains", this.titleCase(searchTerm))
        } else if (this.state.option === "manzanasTotales") {
            query = projects.where(this.state.option, ">=", searchTerm);
        } else if (this.state.option === "manzanasRestantes") {
            query = projects.where(this.state.option, "!=", 0)
        }

        console.log("query length: " + query);
        this.searchDB(query);

    }

    complexSearch() {
        var query = db.collection("projects");
        //var query;

        if (this.state.title != "") {
            query = query.where("title", "==", this.titleCase(this.state.title));
        }
        if (this.state.location != "") {
            query = query.where("locate", "==", this.titleCase(this.state.location));

        }
        if (this.state.min != "" && this.state.max != "") {
            query = query.where("investInitxBlock", ">=", this.state.min).where("investInitxBlock", "<=", this.state.max);
        }

        //no funciona porque solo se puede hacer una llamada de array - contains por query
        if (this.state.filterCrops.length > 0) {
            let i = 0
            do {
                try{

                    query = query.where("cultures", "array-contains", this.state.filterCrops[i])
                } catch(error){
                    console.log(error)
                }
                i++;
                /*this.state.filterCrops.forEach(element => {
                });*/
            } while (query == null)
        } else {
            console.log("vacio")
        }
        this.setState({
            searchTerm: "busqueda por filtros"
        });

        this.searchDB(query);

        //console.log("query length: " + query);


    }

    minMaxValues(values) {

        this.setState({
            min: values[0],
            max: values[1],
        })
    }


    handleOption(value) {
        var sel;
        var category;
        if (value == "title") {
            category = "por nombre"
            if (this.state.titleOption) { sel = false }
            else { sel = true }
            this.setState({
                titleOption: sel,
                locateOption: false,
                invOption: false,
                cropOption: false,
                areaOption: false,
            })
        } else if (value == "locate") {
            category = "por ubicacion"
            if (this.state.locateOption) { sel = false }
            else { sel = true }
            this.setState({
                titleOption: false,
                locateOption: sel,
                invOption: false,
                cropOption: false,
                areaOption: false,
            })
        }
        else if (value == "investment") {
            category = "por inversión mínima"
            if (this.state.invOption) { sel = false }
            else { sel = true }
            this.setState({
                titleOption: false,
                locateOption: false,
                invOption: sel,
                cropOption: false,
                areaOption: false,
            })
        }
        else if (value == "crops") {
            category = "por cultivos"
            if (this.state.cropOption) { sel = false }
            else { sel = true }
            this.setState({
                titleOption: false,
                locateOption: false,
                invOption: false,
                cropOption: sel,
                areaOption: false,
            })
        } else if (value == "manzanasTotales") {
            category = "por manzanas"
            if (this.state.areaOption) { sel = false }
            else { sel = true }
            this.setState({
                titleOption: false,
                locateOption: false,
                invOption: false,
                cropOption: false,
                areaOption: sel,
            })
        }
        var ph = "Buscar proyectos " + category;
        this.setState({
            option: value,
            placeholder: ph
        })

        console.log(this.state.placeholder)
    }

    checkedVal(checkedValues) {
        this.setState({
            filterCrops: checkedValues
        }, () => {

            this.state.filterCrops.forEach(element => {
                console.log("element: " + element)
            });

        })
        /* console.log('checked = ', checkedValues);
         
         console.log("Array crops: " + this.state.filterCrops)*/
    }

    render() {
        //console.log(this.props.params.sarchTerm)
        //let cards = "";
        const selectedButton = {
            backgroundColor: 'rgb(24,162,78)',
            color: 'white',
            borderColor: 'transparent'
        }

        const deselectedButton = {
            backgroundColor: "white"
        }
        let cards = this.state.searchResults.map((doc, i) => {
            console.log("card " + i);


            return (
                <InfoCard
                    //changeLocation={this.changeLocation}
                    key={i}
                    id={doc.id}
                    pic={doc.picProject}
                    title={doc.title}
                    location={doc.locate}
                    lat={doc.coordinates._lat}
                    long={doc.coordinates._long}
                    jobs={doc.projectFinan}
                    money={doc.raisedMoney}
                    center={{ lat: doc.coordinates._lat, lng: doc.coordinates._long }}
                />

            )
        });


        const options = [
            { label: 'Tomate', value: 'Tomate' },
            { label: 'Plátano', value: 'Plátano' },
            { label: 'Manzanas', value: 'Manzanas' },
            { label: 'Banano', value: 'Banano' },
            { label: 'Aguacate', value: 'Aguacate' },
            { label: 'Lechuga', value: 'Lechuga' },
            { label: 'Cebolla', value: 'Cebolla' },
            { label: 'Piña', value: 'Piña' },
            { label: 'Café', value: 'Café' },
            { label: 'Peras', value: 'Peras' },
            { label: 'Mangos', value: 'Mangos' },
            { label: 'Sandias', value: 'Sandias' },
            { label: 'Licha', value: 'Licha' },
            { label: 'Camote', value: 'Camote' },
            { label: 'Yuca', value: 'Yuca' },
            { label: 'Naranja', value: 'Naranja' },
            { label: 'Ciruela', value: 'Ciruela' },
            { label: 'Mora', value: 'Mora' },
            { label: 'Otros', value: 'Otros' },
        ];

        return (
            <div className="info-cont"
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {

                        //console.log("Enter");
                        this.props.history.push('/search/' + this.state.option + "/" + this.state.nextSearch);
                        ev.preventDefault();
                    } else {
                        //console.log("not enter");
                    }
                }}
            >

                <div className="flex-content" id="search-flex">
                    <div>
                        <form className="form-inline my-2 my-lg-0 input-search">
                            <input id="page-search"
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder={this.state.placeholder}
                                aria-label="Busqueda"
                                autocomplete="off"
                                onChange={evt => this.setState(byPropKey('nextSearch', evt.target.value))}

                            />

                            <Link /*onClick = {() => window.location.reload()}*/ to={routes.SEARCHPAGE + "/" + this.state.option + "/" + this.state.nextSearch} >
                                <img id="page-search-icon" src={magnifier} />
                            </Link>


                            {/*<button id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.search}>Búsqueda</button>*/}
                        </form>
                    </div>
                    <div id="button-flex" className="flex-content btn-group" >
                        {(this.state.titleOption) ? <button style={selectedButton} className=" btn-tertiary" onClick={() => this.handleOption("title")}> Titulo</button>
                            : <button className=" btn-tertiary" onClick={() => this.handleOption("title")}> Titulo</button>}
                        {(this.state.locateOption) ? <button style={selectedButton} className=" btn-tertiary" onClick={() => this.handleOption("locate")}> Ubicación</button>
                            : <button className=" btn-tertiary" onClick={() => this.handleOption("locate")}> Ubicación</button>}
                        {(this.state.invOption) ? <button style={selectedButton} className=" btn-tertiary" onClick={() => this.handleOption("investment")}> Inversión</button>
                            : <button className=" btn-tertiary" onClick={() => this.handleOption("investment")}> Inversión</button>}
                        {(this.state.cropOption) ? <button style={selectedButton} className=" btn-tertiary" onClick={() => this.handleOption("crops")}> Cultivos</button>
                            : <button className=" btn-tertiary" onClick={() => this.handleOption("crops")}> Cultivos</button>}
                        {(this.state.areaOption) ? <button style={selectedButton} className=" btn-tertiary" onClick={() => this.handleOption("manzanasTotales")}> Manzanas</button>
                            : <button className=" btn-tertiary" onClick={() => this.handleOption("manzanasTotales")}> Manzanas</button>}
                        {/*
                        <button className="btn-tertiary" onClick={() => this.handleOption("title", "por nombre")}> Titulo</button>
                        <button className="btn-tertiary" type="radio" name="options" id="option2" autoComplete="off" onClick={() => this.handleOption("locate", "por ubicacion")} > Ubicación </button>
                        <button className="btn-tertiary" type="radio" name="options" id="option2" autoComplete="off" onClick={() => this.handleOption("investInitxBlock", "por inversión minima")} > Inversión inicial </button>
                        <button className="btn-tertiary" type="radio" name="options" id="option2" autoComplete="off" onClick={() => this.handleOption("cultures", "por cultivos")} > Cultivos </button>
                        */}
                    </div>
                    <div className="flexbox" id="filter-flex">
                        <div className="side-flex">
                            <div id="sidebar">
                                <h2>Filtros</h2>
                                <div>
                                    <h6>Inversion Minima</h6>
                                    <Slider max="2000" range="true" defaultValue={[100, 2000]} tooltipVisible="true" onChange={evt => this.getSliderValues(evt)} />
                                    <h6>Cultivos</h6>
                                    <CheckboxGroup options={options} onChange={this.checkedVal} />
                                    <h6>Ubicación</h6>
                                    <Input placeholder="Ubicación" onChange={evt => this.setState(byPropKey("location", evt.target.value))} />
                                    <h6>Título exacto</h6>
                                    <Input placeholder="Título" onChange={evt => this.setState(byPropKey("title", evt.target.value))} />
                                    <button className="btn btn-secondary" onClick={() => this.complexSearch()}>Search</button>
                                </div>
                            </div>

                        </div>
                        <div className="main-flex">
                            <div>
                                <h2>Resultados para {this.state.searchTerm}</h2>
                            </div>
                            <div>
                                {(cards && cards.length) ?
                                    <div className="cards-flex">
                                        {cards}
                                    </div>
                                    :
                                    <div>
                                        No se encontraron proyectos.
                                    </div>}
                                {/*cards*/}
                            </div>
                        </div>
                        {/*<Searchbar option={this.state.option}/>*/}
                    </div>
                </div>
                {/* <h1 id="main-title">Proyectos</h1>*/}



            </div>

        );
    }
}

export default SearchPage;
