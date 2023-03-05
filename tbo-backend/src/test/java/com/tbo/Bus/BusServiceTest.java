package com.tbo.Bus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

/**
 * @Title:  BusServiceTest in ram temp db
 * @Description: test all the logics of the api here
 * @Author Long Lin
 * @Version v1.0
 */
@ExtendWith(MockitoExtension.class)
class BusServiceTest {
    @Mock
    private BusRepository busRepository;
    private BusService underTest;
    @BeforeEach
    void setUp(){
        underTest=new BusService(busRepository);
    }
    @Test
    void canGetAllBuses() {
        //when
        underTest.getAllBuses();
        //then
        verify(busRepository).findAll();
    }

    @Test
    void canAddNewBus() {
        //given
        String name = "fast";
        Bus bus = new Bus(name, "Barcelona", "Amazon", false);
        //when
        underTest.addNewBus(bus);
        //then
        ArgumentCaptor<Bus> busArgumentCaptor =ArgumentCaptor.forClass(Bus.class);
        verify(busRepository).save(busArgumentCaptor.capture());
        Bus capturedBus=busArgumentCaptor.getValue();
        assertThat(capturedBus).isEqualTo(bus);
    }

    @Test
    void willTrowExceptionIfCantAddNewBus() {
        //given
        String name = "fast";
        Bus bus = new Bus(name, "Barcelona", "Amazon", false);
        //when
        given(busRepository.findBusByName(anyString())).willReturn(Optional.of(new Bus()));
        //then
        assertThatThrownBy(()->underTest.addNewBus(bus))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("This bus is taken!");
        // and also
        verify(busRepository,never()).save(any());

    }

    @Test
    void canDeleteBus() {
        //given
        Long id = 666L;
        given(busRepository.existsById(id)).willReturn(false);
        // run
        assertThatThrownBy(()->underTest.deleteBus(id))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("There is no such bus "+id+" in the db");
        // then
        verify(busRepository,never()).deleteById(id);
    }

    @Test
    void willTrowExceptionCantDeleteBus() {
        //given
        Long id = 666L;
        given(busRepository.existsById(id)).willReturn(true);
        // run
        underTest.deleteBus(id);
        // then
        verify(busRepository).deleteById(id);
    }

    @Disabled
    @Test
    void updateBus() {
    }
}