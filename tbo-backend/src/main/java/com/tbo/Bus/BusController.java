package com.tbo.Bus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/tbo_v1/bus")
public class BusController {
    private final BusService busService;

    @Autowired
    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping
    public List<Bus> getAllBuses(){
        return busService.getAllBuses();
    }

    @PostMapping
    public void createBus(@RequestBody Bus bus){
        busService.addNewBus(bus);
    }

    @DeleteMapping(path= "{busId}")
    public void deleteBus(@PathVariable("busId") Long busId){
        busService.deleteBus(busId);
    }

    @PutMapping(path= "{busId}")
    public void updateBus(
            @PathVariable("busId") Long busId,

            @RequestParam(required = false) String name,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String imageUrl,
            @RequestParam(required = false) String client,
            @RequestParam(required = false) String active

            ){
       busService.updateBus(busId,name,location,imageUrl,client,active);
        System.out.println("id---"+busId);
        System.out.println("name---"+name);
    }
}
