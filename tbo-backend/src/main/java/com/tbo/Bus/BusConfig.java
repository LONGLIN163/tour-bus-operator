package com.tbo.Bus;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class BusConfig {
    @Bean
    CommandLineRunner commandLineRunner(BusRepository busRepository){
      return args -> {
          Bus b1=new Bus(
                  "Costa brava - L1",
                  "Barcelona",
                  "https://cdn02.visitbarcelona.com/files/5531-3943-imagenCAT/tickets-for-hop-on-hop-off-barcelona-bus-turistic-T24.jpg",
                  "Amazon",
                  "active"
          );
          Bus b2=new Bus(
                  "Road to Rome - T3",
                  "Rome",
                  "https://i.ytimg.com/vi/vxYeqsUPr0g/maxresdefault.jpg",
                  "Amb",
                  "active"
          );
          Bus b3=new Bus(
                  "Sunny in the bus - S8",
                  "London",
                  "https://www.seville-traveller.com/wp-content/uploads/2020/10/seville-buses.jpg",
                  "netflix",
                  "inactive"
          );
          Bus b4=new Bus(
                  "xixi",
                  "Barcelona",
                  "https://cdn02.visitbarcelona.com/files/5531-3943-imagenCAT/tickets-for-hop-on-hop-off-barcelona-bus-turistic-T24.jpg",
                  "Amazon",
                  "active"
          );
          Bus b5=new Bus(
                  "haha",
                  "Rome",
                  "https://i.ytimg.com/vi/vxYeqsUPr0g/maxresdefault.jpg",
                  "Amb",
                  "active"
          );
          Bus b6=new Bus(
                  "hehe",
                  "London",
                  "https://www.seville-traveller.com/wp-content/uploads/2020/10/seville-buses.jpg",
                  "netflix",
                  "inactive"
          );
          busRepository.saveAll(List.of(b1,b2,b3,b4,b5,b6));
      };
    }

}
