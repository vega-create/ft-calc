/**
 * 2026-10-26 本站停止經營：整站 301 到 chparenting.com 家族對應頁（舊網域保留一年）。
 * 家庭類計算機已搬到 pregnancy／baby 的 tools 區；其餘工具導到 baby 的全部工具頁。
 */
const MAP: Record<string, string> = {
  "age": "https://baby.chparenting.com/tools/baby-age-calculator/",
  "bmi": "https://pregnancy.chparenting.com/tools/pre-pregnancy-bmi-calculator/",
  "body-fat": "https://pregnancy.chparenting.com/tools/pre-pregnancy-bmi-calculator/",
  "calorie": "https://pregnancy.chparenting.com/tools/calorie-calculator/",
  "date-difference": "https://pregnancy.chparenting.com/tools/due-date-countdown/",
  "temperature": "https://baby.chparenting.com/tools/fever-temperature-converter/",
  "compound-interest": "https://baby.chparenting.com/tools/college-savings-calculator/",
  "loan": "https://pregnancy.chparenting.com/tools/family-mortgage-calculator/",
  "salary": "https://baby.chparenting.com/tools/childcare-cost-calculator/",
  "weight": "https://pregnancy.chparenting.com/tools/weight-gain-calculator/"
};
const FALLBACK = "https://baby.chparenting.com/tools/";

export const onRequest = async (context: { request: Request }): Promise<Response> => {
  const url = new URL(context.request.url);
  const seg = url.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || '';
  const target = MAP[seg] ?? FALLBACK;
  return Response.redirect(target, 301);
};
