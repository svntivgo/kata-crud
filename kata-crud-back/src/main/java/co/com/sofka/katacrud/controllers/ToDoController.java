package co.com.sofka.katacrud.controllers;

import co.com.sofka.katacrud.models.ToDoModel;
import co.com.sofka.katacrud.services.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@CrossOrigin (origins = "http://localhost:3000")
public class ToDoController {

    @Autowired
    private ToDoService serviceToDo;

    @GetMapping(value = "/api/todos")
    public Iterable<ToDoModel> list() {
        return serviceToDo.list();
    }

    @PostMapping(value = "/api/todo")
    public ToDoModel save(@RequestBody ToDoModel ToDo) {
        return serviceToDo.save(ToDo);
    }

    @PutMapping(value = "/api/todo")
    public ToDoModel update(@RequestBody ToDoModel ToDo) {
        if(ToDo.getId() != null) {
            return serviceToDo.save(ToDo);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "/api/{id}/list")
    public void delete(@PathVariable("id") Long id) {
        serviceToDo.delete(id);
    }

    @GetMapping(value = "/api/{id}/list")
    public ToDoModel get(@PathVariable("id") Long id){
        return serviceToDo.get(id);
    }
}
