import { Component } from '@angular/core';
import { VCard } from 'ngx-vcard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vivia-card';
  data: any;
  // myvCard:VCard | undefined;
  userID!: any;
  anchorLink: any;
  idUsuario:any;
  vCard: VCard = {
  };


  constructor() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let idUsuario = urlParams.get('idUsuario');

    // PETICION, NECESITAMOS URL NUEVA

    const http = new XMLHttpRequest();
    const url =
      'https://prod-14.westeurope.logic.azure.com:443/workflows/3b4e7a599cac473c92c9614dc2144ec9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=x2BA2DqytuhxyfSmTzwm-MKa6zqtglmkm1raTp5ANsE';
    http.open('POST', url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        this.data = JSON.parse(http.responseText);
        this.userID = idUsuario;
        this.anchorLink = 'viviawebstaticqr-secondary.z6.web.core.windows.net/vcard/vcard-' + this.userID + '.vcf';
        // this.anchorLink = 'viviawebstaticqr-secondary.z6.web.core.windows.net/vcard/vcard-1.vcf';
        var download;

        // GENERACION DE VCARD
        this.vCard = {
          language: ['es'],
          address: [
            {
              value: {
                street: this.data.direccion ? this.data.direccion : '-',
                locality: this.data.cuidad ? this.data.cuidad : '-',
                region: this.data.poblacion ? this.data.poblacion : '-',
                postalCode: this.data.codigoPostal
                  ? this.data.codigoPostal
                  : '-',
                countryName: this.data.pais ? this.data.pais : '-',
              },
              param: {
                type: 'work',
              },
            },
          ],
          telephone: [
            {
              value: this.data.telefonoOficina ? this.data.telefonoOficina : '-',
              param: {
                type: 'work',
              },
            },
            {
              value: this.data.telefonoMovil ? this.data.telefonoMovil : '-',
              param: {
                type: 'cell',
              },
            },
          ],

          email: [
            {
              value: this.data.correoElectronico ? this.data.correoElectronico : '-',
              param: {
                type: 'work',
              },
            },
          ],
          title: this.data.puesto ? this.data.puesto : '-',
          organization: this.data.organizacion ? this.data.organizacion : '-',
          name: {
            firstNames: this.data.nombre ? this.data.nombre : '-',
            lastNames: this.data.apellidos ? this.data.apellidos : '-',
          },
        };
      }
    };
    // ENVIO ID DE USUARIO
    http.send(
      JSON.stringify({
        IdUsuario: idUsuario,
      })
    );
  }

  generateVCardOnTheFly = (): VCard => {
    // TODO: Generate the VCard before Download
    return {
    };
  };
}
