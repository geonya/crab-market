import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { kind },
  } = req;
  if (kind === 'favs') {
    const favs = await client.record.findMany({
      where: {
        userId: user?.id,
        kind: 'Fav',
      },
      include: {
        product: true,
      },
    });
    res.json({
      ok: true,
      favs,
    });
  }
  if (kind === 'purchases') {
    const purchases = await client.record.findMany({
      where: {
        userId: user?.id,
        kind: 'Purchase',
      },
      include: {
        product: true,
      },
    });
    res.json({
      ok: true,
      purchases,
    });
  }
  if (kind === 'sales') {
    const sales = await client.record.findMany({
      where: {
        userId: user?.id,
        kind: 'Sale',
      },
      include: {
        product: true,
      },
    });
    res.json({
      ok: true,
      sales,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
