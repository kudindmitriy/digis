import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import DG from '2gis-maps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;
  map: any;
  group: any;
  markers: number[][] = [];

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.map = DG.map('map', {
      center: [54.98, 82.89],
      zoom: 13
    });
    this.userService.getPoints().subscribe(
      data => {
        this.markers = data.mapPoints;
        data.mapPoints.forEach((point) => {
          const marker = DG.marker([point[0], point[1]]).addTo(this.map);
        });
      },
      err => {
        console.log(err);
      }
    );

    this.group = DG.featureGroup();
    this.group.addTo(this.map);
    this.group.on('click', (e) => {
      this.map.setView([e.latlng.lat, e.latlng.lng]);
    });
    this.map.on('click', (e) => {
      const marker = DG.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
      marker.addTo(this.map);
      this.markers.push([e.latlng.lat, e.latlng.lng]);
    });
  }


  onSaveMarkers(): void {
    this.userService.savePoints(this.markers).subscribe(
      data => {
      },
      err => {
        console.log(err);
      }
    );
  }


}
