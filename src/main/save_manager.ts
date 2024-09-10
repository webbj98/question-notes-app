import fs from 'fs';
import { Category } from '../model';
// import loadedData from '../../data.json';

// Right now, saving a category saves all our data
// maybe change when data gets more complext
export default function saveData(data: Category[]) {
  try {
    console.log('saving');
    fs.writeFileSync('./data.json', JSON.stringify(data));
    console.log('done saving');
  } catch (error) {
    console.log('Got error while saving', error);
    // throw Error('Error while saving: ');
  }
}

export function loadData(): Category[] {
  // TODO: Change to a read from file
  // console.log("window llocation: ", window.location)
  // let fr = new FileReader();
  // let result;
  // fr.onload(() => {
  //   result = fr.result;
  // })
  // fr.readAsText('data.json');
  // console.log(result);
  const loadedData: string = fs.readFileSync('data.json', 'utf8')
  console.log('Loaded data: ', loadedData);
  return loadedData;
  return [];
}
