/* eslint-disable @typescript-eslint/no-explicit-any */
import * as R from 'ramda';

class GovParams {
  public params: {
    depositParams: {
      minDeposit: {
        denom: string;
        amount: string;
      }[];
      maxDepositPeriod: number;
    };
    tallyParams: {
      quorum: string;
      threshold: string;
      vetoThreshold: string;
    };
    votingParams: {
      votingPeriod: number;
    };
  };

  constructor(payload: any) {
    this.params = payload.params;
  }

  static fromJson(data: any) {
    return new GovParams({
      params: {
        depositParams: {
          minDeposit: R.pathOr([], ['params', 'min_deposit'], data).map((x) => ({
            denom: x.denom,
            amount: x.amount,
          })),
          maxDepositPeriod: R.pathOr(0, ['params', 'max_deposit_period'], data),
        },
        tallyParams: {
          quorum: R.pathOr('0', ['params', 'quorum'], data),
          threshold: R.pathOr('0', ['params', 'threshold'], data),
          vetoThreshold: R.pathOr('0', ['params', 'veto_threshold'], data),
        },
        votingParams: {
          votingPeriod: R.pathOr(0, ['params', 'voting_period'], data),
        },
      },
    });
  }
}

export default GovParams;
