import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { cityData } from '@libs/types';

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  const city = event.pathParameters?.city;
  if (!city || !cityData[city]) {
    return formatJSONResponse(400, {
      message: 'No city parameter passed or no data for city',
      event,
    });
  }
  console.log(cityData[city]);

  return formatJSONResponse(200, {
    message: cityData[city],
    event,
  });
};

export const main = middyfy(handler);
