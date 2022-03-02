import React, {useContext, createContext, useReducer, useEffect, useRef, useState} from 'react';

const HOST_API = "http://localhost:8080/api"
const initialState = {
    list: [],
    item: {}
}

const Store = createContext(initialState)
//a
const Form = () => {
    const formRef = useRef(null);
    const { dispatch, state: {item} } = useContext(Store);
    const [state, setState] = useState(item);

    const onAdd = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            // description: state.description,
            id: null,
            isComplete: false
        };

        fetch(HOST_API+"/todo", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((todo) => {
            dispatch({ type: "add-item", item: todo });
            setState({name: ""});
            formRef.current.reset();
        });
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
        name: state.name,
        // description: state.description,
        id: item.id,
        isComplete: item.isCompleted,
        };

        fetch(HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((todo) => {
            dispatch({ type: "update-item", item: todo });
            setState({ name: "" });
            formRef.current.reset();
        });
    };

    return (
        <form ref={formRef}>
            <input
                type="text"
                name="name"
                defaultValue={item.name}
                onChange={(event) => {
                    setState({ ...state, name: event.target.value });
                }}
            ></input>
            {item.id && <button onClick={onEdit}>Actualizar</button>}
            {!item.id && <button onClick={onAdd}>Agregar</button>}
        </form>
    );
}

const List = () => {
    const {dispatch, state} = useContext(Store);

    useEffect(() => {
        fetch(HOST_API+"/todos")
        .then(response => response.json())
        .then((list) => {
            dispatch({type: "update-list", list})
        })
    }, [state.list.lenght, dispatch])

    const onDelete = (id) => {
        fetch(HOST_API + "/"+id+"/todo", {
            method: "DELETE"
        })
        .then((list) => {
            dispatch({ type: "delete-item", id })
        })
    };

    const onEdit = (toDo) => {
        dispatch({ type: "edit-item", item: toDo });
    }

    return <div>
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Nombre</td>
                    <td>¿Está completado?</td>
                </tr>
            </thead>
            <tbody>
                {state.list.map((toDo) =>{
                    return (
                        <tr key={toDo.id}>
                            <td>{toDo.id}</td>
                            <td>{toDo.name}</td>
                            <td>{toDo.isCompleted === true ? "SI" : "NO" }</td>
                            <td><button onClick= {() => onDelete(toDo.id)}>Eliminar</button></td>
                            <td><button onClick= {() => onEdit(toDo)}>Editar</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
}

function reducer(state, action) {
    switch (action.type) {
    case "update-item":
        const listUpdateEdit = state.list.map((item) => {
            if(item.id === action.item.id) {
                return action.item;
            }
            return item
        })
        return { ...state, list: listUpdateEdit, item: {} }
    case "delete-item":
        const listUpdate = state.list.filter((item) => {
            return item.id !== action.id;
        })
        return { ...state, list: action.list }
    case "update-list":
        return { ...state, list: action.list };
    case "edit-item":
        return { ...state, item: action.item };
    case "add-item":
        const newList = state.list;
        newList.push(action.item);
        return { ...state, list: newList };
    default:
        return state;
    }
}

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Store.Provider value={{ state, dispatch }}>
            {children}
        </Store.Provider>
    );
};


function App() {
    return (
        <StoreProvider>
            <Form />
            <List />

        </StoreProvider>
    );
}

export default App;
