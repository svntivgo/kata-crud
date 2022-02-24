package co.com.sofka.katacrud.services;

import co.com.sofka.katacrud.models.ToDoModel;
import co.com.sofka.katacrud.repositories.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository repoToDo;

    public Iterable<ToDoModel> list() {
        return repoToDo.findAll();
    }

    public ToDoModel save(ToDoModel ToDo) {
        return repoToDo.save(ToDo);
    }

    public void delete(Long id) {
        repoToDo.delete(get(id));
    }

    public ToDoModel get(Long id){
        return repoToDo.findById(id).orElseThrow();
    }
}
