import routePaths from "~/router/routes";
import { useRouter } from "vue-router";

interface UseNavigationReturn {
  goToHomePage: () => void;
  goToCreateCostPage: () => void;
  goToCreatePaymentPage: () => void;
  goToCreateAccountPage: () => void;
  goToTransactionsPage: () => void;
  goToBulkAddCostsPage: () => void;
  goBack: () => void;
}

export default function useNavigation(): UseNavigationReturn {
  const router = useRouter();

  return {
    goToHomePage: (): void => {
      router.push(routePaths.homePage.path);
    },
    goToCreateCostPage: (): void => {
      router.push(routePaths.createCostPage.path);
    },
    goToCreatePaymentPage: (): void => {
      router.push(routePaths.createPaymentPage.path);
    },
    goToCreateAccountPage: (): void => {
      router.push(routePaths.createAccountPage.path);
    },
    goToTransactionsPage: (): void => {
      router.push(routePaths.transactionsPage.path);
    },
    goToBulkAddCostsPage: (): void => {
      router.push(routePaths.bulkAddCostsPage.path);
    },
    goBack: (): void => {
      router.back();
    },
  };
}
