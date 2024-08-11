import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { WatchlistDTO } from './dto';
import { User } from '../users/models/user.model';
import { CreateAssetResponse } from './response';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: typeof Watchlist,
  ) {}

  async createAsset(
    user: User,
    dto: WatchlistDTO,
  ): Promise<CreateAssetResponse> {
    const watchlist = { user: user.id, name: dto.name, assetId: dto.assetId };

    await this.watchlistRepository.create(watchlist);

    return watchlist;
  }

  async deleteAsset(userId: number, id: string): Promise<boolean> {
    await this.watchlistRepository.destroy({
      where: { id, user: userId },
    });

    return true;
  }
}
