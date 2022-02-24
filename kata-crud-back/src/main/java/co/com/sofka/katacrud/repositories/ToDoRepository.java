package co.com.sofka.katacrud.repositories;


import co.com.sofka.katacrud.models.ToDoModel;
import org.springframework.data.repository.CrudRepository;

public interface ToDoRepository extends CrudRepository<ToDoModel, Long> {
}
