import express from 'express';
import { promises as fs } from 'fs';
import sizeOf from 'image-size';
import sharp from 'sharp';
const routes = express.Router();
routes.get('/', async function (req, res) {
  const full = await fs.readdir('./full');
  let inFull = false;
  // check if there is missing parameters
  if (!req.query.width || !req.query.height || !req.query.filename) {
    res.send('please enter a filename and height and a width');
  } else {
    // check if the filename is found in the full folder
    for (let i = 0; i < full.length; i++) {
      if (
        full[i] == req.query.filename ||
        full[i] == req.query.filename + '.jpg'
      ) {
        inFull = true;
        break;
      }
    }
    if (inFull == true) {
      let p: string = req.query.filename + '';
      if (!p.includes('.jpg')) {
        p = p + '.jpg';
      }
      const dimension = sizeOf('./full/' + p);
      const image = await fs.readFile('./full/' + p);
      //if the size entered is the same as original size it will not add it in the thumb folder
      if (
        dimension.height == Number(req.query.height) &&
        dimension.width == Number(req.query.width)
      ) {
        res.end(image);
      } else {
        //check if the wanted size is already in thumb folder
        let inThumb = false;
        const thumb = await fs.readdir('./thumb');
        const p2 = p.substring(0, p.length - 4); //with out .jpg extension;
        for (let i = 0; i < thumb.length; i++) {
          if (
            thumb[i] ==
              p2 + '_' + req.query.width + '_' + req.query.height + '.jpg' ||
            thumb[i] ==
              p2 + '_' + req.query.width + '_' + req.query.height + '.jpg'
          ) {
            inThumb = true;
            break;
          }
        }
        if (inThumb == true) {
          const image2 = await fs.readFile(
            './thumb/' +
              (p2 + '_' + req.query.width + '_' + req.query.height + '.jpg')
          );
          res.end(image2);
        } else {
          // create new image with the new size and put it in thumb folder
          await sharp('./full/' + p)
            .resize(Number(req.query.width), Number(req.query.height))
            .toFile(
              './thumb/' +
                (p2 + '_' + req.query.width + '_' + req.query.height + '.jpg')
            );
          const image3 = await fs.readFile(
            './thumb/' +
              (p2 + '_' + req.query.width + '_' + req.query.height + '.jpg')
          );
          res.end(image3);
        }
      }
    } else {
      // if the filename entered is not in full folder
      res.send('invalid name or invalid file extension');
    }
  }
});
export default routes;
