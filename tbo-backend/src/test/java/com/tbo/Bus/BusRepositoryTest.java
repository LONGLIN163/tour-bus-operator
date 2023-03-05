package com.tbo.Bus;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class BusRepositoryTest {
    @Autowired
    private BusRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }
    /**
     * @Title:  findBusByName in real db
     * @Description: test custom query in the repository(enable this test and run it with the db connected)
     * @Author Long Lin
     * @Version v1.0
     */
    @Disabled
    @Test
    void shouldFindBusByName(){
        // given
        String name = "fast";
        Bus bus = new Bus(name, "Barcelona", "Amazon", false);
        underTest.save(bus);
        // when
        boolean expected  = underTest.findBusByName("fast").isPresent();
        // then
        assertThat(expected).isTrue();
    }
}