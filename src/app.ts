/*import {ProjectInput} from './components/project-input';
import {ProjectList} from './components/project-list';

  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");

  console.log('hi');*/
  import 'reflect-metadata';
  import { plainToClass } from "class-transformer";
  import { validate } from 'class-validator';

  import { Product } from './product.model';

  import * as _ from 'lodash';
  declare var GLOBAL: string;

  console.log(_.shuffle([1, 2, 3, 4, 5]));

  console.log(GLOBAL);

  const products = [
    { title: 'A Fan', price: 2.99 },
    { title: 'A Mop', price: 5000 },
  ];

  const newProd = new Product('', -100);
  validate(newProd).then(errors => {
    if(errors) {
      console.log('Errors: ');
      console.log(errors);
    } else {
      console.log(newProd.getInformation());
    }
  });
  console.log(newProd.getInformation());

  const loadedProducts = plainToClass(Product, products);

  for (const prod of loadedProducts) {
    console.log(prod.getInformation());
  }

  const p1 = new Product('A Game', 12.99);

  console.log(p1.getInformation());
