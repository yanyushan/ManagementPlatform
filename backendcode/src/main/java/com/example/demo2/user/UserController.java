package com.example.demo2.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
//@CrossOrigin(origins = {"http://localhost:3000"},allowCredentials = "true",allowedHeaders = {"X-Custom-Header"},
        //maxAge = 3600L, methods={RequestMethod.GET,RequestMethod.POST,RequestMethod.HEAD})
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;


    @GetMapping//查
    public List<User> getList() {
        return this.userRepository.findAll();
    }
    @PostMapping//增
    public Object addUser(@RequestBody User user) {
        this.userRepository.save(user);
        return true;
    }
    @DeleteMapping("/{id}")//删
    public Object delUser(@PathVariable Integer id
    ) {
        this.userRepository.deleteById(id);
        return true;
    }

    /***@RequestMapping("/")
    @ResponseBody

    public User getUser(@RequestParam("name")String name, @RequestParam("id") String id ){
        User user = userRepository.findById(Integer.parseInt(id)).get();

        return user;
    }
    ***/

}
