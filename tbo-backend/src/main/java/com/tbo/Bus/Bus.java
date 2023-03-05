package com.tbo.Bus;
import javax.persistence.*;
@Entity
@Table
public class Bus {

    @Id
    @SequenceGenerator(
            name="bus_sequence",
            sequenceName = "bus_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "bus_sequence"
    )

    private Long id;
    private String name;
    private String location;
    private String imageUrl;
    private String client;
    //private Boolean active;
    private String active;


    public Bus() {
    }

    public Bus(String name, String location,String imageUrl, String client, String active) {
        this.name = name;
        this.location = location;
        this.imageUrl = imageUrl;
        this.client = client;
        this.active = active;
    }

    public Bus(Long id, String name, String location,String imageUrl, String client, String active) {
        this.id=id;
        this.name = name;
        this.location = location;
        this.imageUrl = imageUrl;
        this.client = client;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }


    @Override
    public String toString() {
        return "Bus{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", client='" + client + '\'' +
                ", active=" + active +
                '}';
    }
}

